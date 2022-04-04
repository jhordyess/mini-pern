#? https://hub.docker.com/_/node
FROM node:16
RUN apt-get update \
  && apt-get install -y sudo \
  && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
  && chmod 0440 /etc/sudoers.d/node
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
USER node
RUN printf "alias update='sudo apt-get update -y;sudo apt-get upgrade -y;sudo apt-get autoremove --purge -y'\nalias nosave='clear;history -c'" >> ~/.bashrc