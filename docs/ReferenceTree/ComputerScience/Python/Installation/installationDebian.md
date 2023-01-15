---
title: Install Specific Python Version on Debian
layout: single
sidebar:
    nav: computer science
---

Jan. 8, 2023

Debian comes with a specific version of python3 via the repository. [Packages-Stable-python3](https://packages.debian.org/stable/python/python3)

## Introduction

This write-up explains how to install multiple versions of python on Debian and switch between them in a simple manner that makes sense to me. I have combined information from the pages found in [References](#references) section

Originally tested with the following spec:

| Spec | Value |
| - | - |
| Operating System | Debian GNU/Linux 11 |
| KDE Plasma Version | 5.20.5 |
| KDE Frameworks Version | 5.78.0 |
| Qt Version | 5.15.2 |
| Kernel Version | 5.10.0-20-amd64 |
| OS Type | 64-bit |

Most of the information, but not all, was originally found from Voltr.[^vultr]

## Update Included Version

To update the Debian default python3 version, follow the steps below:

```console
$ sudo apt update && sudo apt upgrade
```

Check installed version.

```console
$ python3 -V
Python 3.9.2
```

## Install Dependencies

Install the necesary dependencies.[^pythonDev]

```console
$ sudo apt-get install build-essential gdb lcov pkg-config \
      libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev \
      libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev \
      lzma lzma-dev tk-dev uuid-dev zlib1g-dev
```

Also install `wget` in order to download a specific python version.

```console
$ sudo apt-get install wget
```

## Install Python Version

Visit the website [python ftp](https://www.python.org/ftp/python) and choose a python version. You will need the version revision number in the command below.

Download the `.tgz` file such as, `Python-3.10.9.tgz`, using `wget`.

```console
$ wget https://www.python.org/ftp/python/3.10.9/Python-3.10.9.tgz
```

Extract the downloaded python source code.

```console
$ tar xzf Python-3.10.9.tgz
```

Compile the python source code.

```console
$ cd Python-3.10.9 && ./configure --enable-optimizations
```

Install python.

**Warning:** Do not use `make install`. This will try to overwrite the kernel installed version.
{: .notice--warning}

```console
$ sudo make altinstall
```

Check the name of your new python executable.

```console
$ ls /usr/local/bin/python*
/usr/local/bin/python3.10  /usr/local/bin/python3.10-config
```

Check alternate installations of python.

```console
$ update-alternatives --list python
update-alternatives: error: no alternatives for python
```

Check your kernel installed python version.

```console
ls /usr/bin/python*
/usr/bin/python  /usr/bin/python3  /usr/bin/python3.9
```

Set your kernel installed python version to an alternate by using the version revision number from `/usr/bin/python`. Mine is `python3.9`.

```console
$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.9 1
```

Set the new python executable as an alternate python version. Change the `2` at the end of the command below to the next number in your alternative list. I currently have no alternates installed except for the included kernel version, so I will use a `2`.

```console
$ sudo update-alternatives --install /usr/bin/python python /usr/local/bin/python3.10 2
```

The number at the end represents the priorty of the versions. The higher the number, the higher the priority.

## Switch Python Version

Lastly, select the python version that you would like to use when the `python` command is used in the console.[^altswitch]

```console
$ sudo update-alternatives --config python
There are 2 choices for the alternative python (providing /usr/bin/python).

  Selection    Path                       Priority   Status
------------------------------------------------------------
* 0            /usr/local/bin/python3.10   2         auto mode
  1            /usr/bin/python3.9          1         manual mode
  2            /usr/local/bin/python3.10   2         manual mode

Press <enter> to keep the current choice[*], or type selection number: 0
```

```console
$ python -V
Python 3.10.9
```

```console
$ sudo update-alternatives --config python
There are 2 choices for the alternative python (providing /usr/bin/python).

  Selection    Path                       Priority   Status
------------------------------------------------------------
  0            /usr/local/bin/python3.10   2         auto mode
  1            /usr/bin/python3.9          1         manual mode
* 2            /usr/local/bin/python3.10   2         manual mode

Press <enter> to keep the current choice[*], or type selection number: 1
update-alternatives: using /usr/bin/python3.9 to provide /usr/bin/python (python) in manual mode
```

```console
$ python -V
Python 3.9.2
```

## References

[^vultr]: [Vultr](https://www.vultr.com/docs/update-python3-on-debian/)

[^pythonDev]: [Python Dev](https://devguide.python.org/getting-started/setup-building/#install-dependencies)

[^altswitch]: [linux config](https://linuxconfig.org/how-to-change-from-default-to-alternative-python-version-on-debian-linux)
