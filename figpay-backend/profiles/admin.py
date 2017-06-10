# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Consumer, Vendor


class ConsumerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']
    search_fields = ['id', 'user__username']

    actions = ['enroll_faces']

    def enroll_faces(self, request, queryset):
        for model in queryset:
            response = model.enroll()
            print(response)

    enroll_faces.short_description = "Enroll Faces to Face recognition API"

admin.site.register(Consumer, ConsumerAdmin)
admin.site.register(Vendor)
