# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from profiles.models import Vendor, Consumer

from django.conf import settings

class Upload(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(Vendor, related_name='originating_uploads')
    image_1 = models.ImageField(upload_to='pos/snaps/')

    # url = models.URLField(null=True)
    recognized_user_id = models.TextField(blank=True, max_length=500)
    recognized_profile = models.ForeignKey(Consumer, null=True, blank=True, related_name='paying_uploads')
    recognition_successful = models.BooleanField(default=False)

    def __str__(self):
        return "Uploaded %s" % self.created_on.time()

    def recognize(self):
        import kairos_face
        from kairos_face.exceptions import ServiceRequestError
        try:
            response = kairos_face.recognize_face(url=self.image_1.url, gallery_name=settings.KAIROS_GALLERY)
        except ServiceRequestError as e:
            return {'prof': None, 'message': 'No faces detected', 'status': 400}
        print(response)

        if len(response['images']) == 0:
            return {'prof': None, 'message': '', 'status': 400}

        if response['images'][0]['transaction']['status'] == 'success':
            prof_id = response['images'][0]['transaction']['subject_id']
            self.recognized_user_id = prof_id
            self.recognition_successful = True

            try:
                prof = Consumer.objects.get(pk=prof_id)
                self.recognized_profile = prof
                self.save()
                return {'prof': prof, 'message': 'User found!', 'status': 200}
            except Consumer.DoesNotExist:
                self.save()
                return {'prof': None, 'message': 'No matching user found', 'status': 404}

        else:
            return {'prof': None, 'message': 'User Not Found', 'status': 404}
