# ubuntu with development packages
FROM ubuntu:24.10 AS dev-base

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC
RUN apt-get update && apt-get --yes install git vim gnupg2 curl unzip && apt-get clean

# bun runtime
FROM dev-base AS js-base

SHELL ["/bin/bash", "-c"]

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.10"