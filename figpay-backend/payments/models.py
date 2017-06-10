# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import uuid
from profiles.models import Consumer, Vendor


class PointOfSale(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey(Vendor)
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.id)


class Payment(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    pos = models.ForeignKey(PointOfSale, related_name='payments')
    consumer = models.ForeignKey(Consumer, related_name='payments')
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.created_on)

    class Meta:
        ordering = ['-created_on']