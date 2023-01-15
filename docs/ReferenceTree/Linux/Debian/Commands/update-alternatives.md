---
title: update-alternatives
layout: single
sidebar:
    nav: computer science
---

Jan. 8, 2023

Quick reference for some common `update-alternatives` commands.

update-alternatives creates, removes, maintains and displays information about the symbolic links comprising the Debian alternatives system.[^linuxmanUpdateAlternatives]

Allows the user to link alternative programs or versions of a program to a single command, called a name.

## Get Links: --list

```console
update-alternatives --list
```

### Example List

```console
$ sudo update-alternatives --list py
/usr/bin/python3.9
```

```console
$ sudo update-alternatives --list py
/usr/bin/python3.9
/usr/local/bin/python3.10
/usr/local/bin/python3.11
```

## Create a Link: --install

```console
update-alternatives --install link name path priority
```

| Parmeters | Value |
| - | - |
| link | /usr/bin/python |
| name | py |
| path | /usr/bin/python3.9 |
| prioity | 1 |

### Example Install

```console
$ sudo update-alternatives --install /usr/bin/python py /usr/bin/python3.9 1
update-alternatives: using /usr/bin/python3.9 to provide /usr/bin/python (py) in auto mode
```

```console
$ sudo update-alternatives --install /usr/bin/python py /usr/local/bin/python3.10 2
update-alternatives: using /usr/local/bin/python3.10 to provide /usr/bin/python (py) in auto mode
```

## Select Alternate: --config

One way to select which alternate is used.

```console
update-alternatives --config name
```

| Parmeters | Value |
| - | - |
| name | py |

```console
$ sudo update-alternatives --config py
There are 3 choices for the alternative py (providing /usr/bin/python).

  Selection    Path                       Priority   Status
------------------------------------------------------------
  0            /usr/local/bin/python3.11   3         auto mode
  1            /usr/bin/python3.9          1         manual mode
* 2            /usr/local/bin/python3.10   2         manual mode
  3            /usr/local/bin/python3.11   3         manual mode

Press <enter> to keep the current choice[*], or type selection number: 0
update-alternatives: using /usr/local/bin/python3.11 to provide /usr/bin/python (py) in auto mode
```

## References

[^linuxmanUpdateAlternatives]: [man7](https://man7.org/linux/man-pages/man1/update-alternatives.1.html)
