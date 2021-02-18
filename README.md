# Longbox

:warning: **This code is a work in progress. It should be considered unstable, untested, and unsupported.** :warning:

## Overview

This is a comic book collection tracking app that allows a user to organize their collection and browse various statistics related to their reading habits. Future ideas and enhancements include:

- Track a pull list of upcoming releases.
- Graph purchases and spending over time.
- Identify trending writers and artists in their collection.

Note: For development purposes, PostgreSQL runs in a docker container. In production, PostgreSQL should run in its own environment and the `config/database.yml` file should be updated.

## Dependencies

- Docker
- Docker Compose

## Technical Overview

### API Container

- Ruby 3.0.0
- PostgreSQL
- Puma
- Rails 6.1
- Rspec
- GraphQL

### Web Client Container

- Typescript
- React
- Apollo GraphQL Client

### Database Container

- Postgres
