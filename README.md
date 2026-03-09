# Gharpayy CRM – Lead Management System

## Overview

This project is a Minimum Viable Product (MVP) CRM system built for Gharpayy to manage and track leads efficiently.

The system captures leads, assigns agents, tracks pipeline stages, schedules property visits, and provides analytics.

---

## Features

### Lead Capture
Leads can be created through API requests.

Fields stored:
- Name
- Phone number
- Lead source
- Assigned agent
- Timestamp

---

### Lead Assignment
Leads are automatically assigned to agents.

Example:
Agent1 → Agent2 → Agent3

---

### Lead Pipeline

Stages supported:

- New Lead
- Contacted
- Requirement Collected
- Property Suggested
- Visit Scheduled
- Visit Completed
- Booked
- Lost

---

### Visit Scheduling

Agents can schedule property visits.

Fields stored:

- Property
- Visit date
- Visit time
- Visit outcome

---

### Dashboard Analytics

The system provides:

- Total leads
- Leads in each stage
- Visits scheduled
- Bookings confirmed

---

## Tech Stack

Backend:

- Node.js
- Express
- MongoDB
- Mongoose

Frontend:

- React

API Documentation:

- Swagger UI

---

## System Architecture

Frontend (React Dashboard)
        ↓
Node.js Express API
        ↓
MongoDB Database

---

## Database Design

Collection: leads

Fields:

name  
phone  
source  
status  
assignedAgent  
property  
visitDate  
visitTime  
visitOutcome  

---

## API Documentation

Swagger documentation available at: