# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class AbstractProfile(models.Model):
    user = models.OneToOneField(User)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    # ptype = models.CharField(max_length=10, choices=USER_TYPES)
    class Meta:
        abstract = True

    def __str__(self):
        return self.user.username


class Consumer(AbstractProfile):
    pin = models.IntegerField()

    image_1 = models.ImageField(null=True, upload_to='profiles/consumers')
    image_2 = models.ImageField(null=True, blank=True, upload_to='profiles/consumers')
    image_3 = models.ImageField(null=True, blank=True, upload_to='profiles/consumers')
    image_4 = models.ImageField(null=True, blank=True, upload_to='profiles/consumers')
    image_5 = models.ImageField(null=True, blank=True, upload_to='profiles/consumers')

    def enroll(self):
        import kairos_face
        images = ['image_%s' % i for i in range(1, 5)]
        for img in images:
            attr = getattr(self, img, None)
            if attr:
                response = kairos_face.enroll_face(url=attr.url, subject_id=str(self.id),
                                                   gallery_name='figgallery')
        return response

    def __str__(self):
        return "(Consumer) %s " % self.user.username

    @property
    def fullname(self):
        return "%s %s" % (self.first_name, self.last_name)


class Vendor(AbstractProfile):
    def __str__(self):
        return "(Vendor) %s " % self.user.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
