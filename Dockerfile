#####################
# DEVELOPMENT IMAGE #
#####################

# Pull base image
FROM node:12 AS builder

# Set working directory
WORKDIR /code

# Install dependencies
COPY ./package.json ./yarn.lock /code/
RUN yarn install --pure-lockfile

# Copy project
COPY ./ /code/

# Run starting command
CMD ["yarn", "start"]

#####################
# PRODUCTION IMAGE #
#####################

# Pull base image
FROM node:12 AS prod

# Set working directory
WORKDIR /code

# Install production dependencies
COPY ./package.json ./yarn.lock /code/
RUN yarn install --pure-lockfile --production=true

# Copy source code, protos
COPY --from=builder /code/dist /code/

# Run starting command
CMD ["yarn", "run-server"]
