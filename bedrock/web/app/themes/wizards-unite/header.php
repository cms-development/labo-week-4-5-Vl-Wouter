<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <!-- <link rel="stylesheet"  href="style.css"> -->
    <?php wp_head(); ?>
</head>

<body>

    <header class="header-wrapper" style="background-image: url('<?php header_image()  ?>')">

        <a href="" class="logo"><?php if(function_exists('the_custom_logo') { the_custom_logo() }) ?></a>

        <!-- navigatie -->
        <div class="container header_container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <h1 class="logo"><?php wp_title('|', true, 'right'); ?></h1>
                </div>
                <div class="col-12 col-md-6 nav">
                    <nav class="nav-main">
                        <?php
                            wp_nav_menu(['theme_location' => 'header-menu']);
                        ?>
                        <!-- <ul class="navbar-right">
                            <li class="page_item"><a class="nav-item__link active" href="index.html" title="Fans">De
                                    Fanclub</a></li>
                            <li class="page_item"><a class="nav-item__link" href="creatures.html"
                                    title="Creatures">Magical Creatures</a></li>
                            <li class="page_item"><a class="nav-item__link" href="wordfan.html" title="Contact">Word
                                    fan!</a></li>
                        </ul> -->
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <div class="main-wrapper">
    <!-- page content -->
    <div class="container">