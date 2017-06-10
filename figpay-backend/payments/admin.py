# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Payment, PointOfSale


class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'pos']
    actions = ['send_payment']

    def send_payment(self, request, queryset):
        Payment.objects.all()[:1].get().send_payment()


admin.site.register(Payment, PaymentAdmin)
admin.site.register(PointOfSale)
