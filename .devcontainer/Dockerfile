FROM alpine

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apk add --no-cache git nodejs openssh-client sudo nodejs-dev yarn

RUN addgroup -g $USER_GID $USERNAME \
    && adduser -S -s /bin/bash -u $USER_UID -G $USERNAME $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && mkdir -p /home/$USERNAME/.ssh \
    && chown -R $USERNAME:$USERNAME /home/$USERNAME

RUN mkdir -p /workspace/node_modules \
    && mkdir -p /workspace/.next \
    && chown -R $USERNAME:$USERNAME /workspace
