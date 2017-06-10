# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Payment, PointOfSale

admin.site.register(Payment)
admin.site.register(PointOfSale)
