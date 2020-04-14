---
title: "Laravel’s Artisan: A handy toolbox"
date: "2018-07-16"
coverImage: "GLOMO_Blogpost_Toolbox_Laravel.jpg"
---

**The Laravel PHP framework has a lot of functionality. It handles a lot of things, ranging from authentication to database management to view templating, and one of the tools it uses to do this is Artisan. Artisan is the CLI (Command Line Interface) of Laravel and it comes with number of helpful commands that can help you, even a command to create your own commands.**

To view the list list of commands simply type “php artisan” (or “php artisan list”). The commands are divided into categories to group them logically. To get help with a command you can type the command and add the “-h” (or “—help”) option, which will give some information about the command including options and parameters. For example if you run “php artisan migrate -h”, you will be informed that you can add the “—seed” option, which will seed the database after the migrations are run.

The “php artisan make:console” command helps you to create your own commands by creating the boilerplate for your command. Then you can add a signature and which parameters the command needs, and of course the functionality of the command. Then for example you can use a cronjob to schedule for your command to be run at a given time.

I’ve found this to be a really helpful tool when developing, creating commands that email users to warn them of upcoming deadlines for example.
