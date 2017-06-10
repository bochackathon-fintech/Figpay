# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Upload


class UploadAdmin(admin.ModelAdmin):
    model = Upload

    actions = ['recognize_faces']

    def recognize_faces(self, request, queryset):
        for model in queryset:
            response = model.recognize()

    recognize_faces.short_description = "Recognize Faces"


admin.site.register(Upload, UploadAdmin)
