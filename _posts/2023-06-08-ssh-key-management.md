---
title: My tips to manage ssh key and git config
tags: [KeePassXC, ssh, git, setup]
---

Like many people using ssh key for git or authentication, it’s been a pain to set and  manage them. Often I was also taking shortcuts that could be dangerous for a security point of view. I will share what is working for me.

## KeePassXC: storing ssh key & adding to the agent

By default, I was using the ssh-agent on Linux and Putty pageant on Windows. For this tools, usually you need to add the key  that you want and enter the password (usually you should always have some to be sure if it's lost, it can't be use at it. Of course i know usually the password are bad and would not stay long to brut force).

It’s already an incredible tool to store your account and password. But with the features around the ssh key, this tool is amazing. You can look for detail about those feature on their [documentations](https://KeePassXC.org/docs/#faq-ssh-agent-keys)

### 1. Enable SSH agent integration in the application

Depending on your OS, you will have various choices of agent to select. Some of them don’t support all the features of KeePassXC (look at the documentation for details)

![ssh app setting](/assets/img/blog/2023-06_ssh-agent.jpg)

### 2. Create your entries

Create an entry for your ssh key with the name and password
In the Advanced section, add the ssh key as an Attachments
In the SSH Agent section, select what you want. more selection should be more secure but everything don’t work with all agent
![ssh entry setting](/assets/img/blog/2023-06_ssh-entry.jpg)

> Same for account management, It’s better, for security, to have multiple databases depending on your needs (each customer, projects, etc.).

## Git configuration

My experience brought me to work with various customers and git tools. It means using different identities and services (but sometimes the same). I’ve wasted a lot of time finding some keys or setting the local git config. KeePassXC solved my problem for keys, but for the setting, I only found the solution for git after looking a bit more at another developer that was [Using conditional include in git config](https://git-scm.com/docs/git-config#_includes) (as we always say RTFM ^_^).

I used them a bit differently depending on my working configuration. The idea is to set a default git-config that target a complete sub configuration.

> Mixing both is usually not working, but can work if your are using self hosted git solution

### Depending of the **dir**

I usually use this one if I have to work with various customers that could  use the same public services.

``.gitconfig`` file:

```conf
[includeIf "gitdir:~/customerA/"]
  path = ~/customerA/git-config-a.conf

[includeIf "gitdir:~/customerB/"]
  path = ~/customerA/git-config-b.conf

[includeIf "gitdir:~/customerC/"]
  path = ~/customerA/git-config-c.conf
```

path example for the config:

```txt
_ home/
  |_ .gitconfig
  |_ customerA/
    |_ .git-config-a.conf
    |_ project1/
    |_ project2/
  |_ customerB/
    |_ .git-config-b.conf
    |_ project1/
    |_ project2/
  |_ customerC
    |_ .git-config-c.conf
    |_ project1/
    |_ project2/
```

### Depending of the **remote service**

I usually use this one if I can use only one identity for the same services. The folders organization is simpler.

``.gitconfig`` file:

```conf
[includeIf "hasconfig:remote.*.url:git@github.com:*/*"]
  path = ~/projects/git-github.conf

[includeIf "hasconfig:remote.*.url:git@gitlab.com:*/*"]
  path = ~/projects/git-gitlab.conf

[includeIf "hasconfig:remote.*.url:git@bitbucket.org:*/*"]
  path = ~/projects/git-bitbucket.conf
```

path example for the config:

```txt
_ home/
  |_ .gitconfig
  |_ projects
    |_ .git-bitbucket.conf
    |_ .git-github.conf
    |_ .git-gitlab.conf
    |_ project1/
    |_ project2/
    |_ project3/
    |_ project4/
```
