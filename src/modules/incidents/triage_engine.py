from dataclasses import dataclass
from typing import List, Dict, Any
import math

@dataclass
class HazardPolygon:
    id: str
    risk_multiplier: float
    coordinates: List[List[float]]  # List of [lng, lat]

@dataclass
class TriageResult:
    incident_id: str
    priority_score: float
    requires_immediate_escalation: bool
    suggested_status: str
    reason: str

def point_in_polygon(x: float