# Magento 2 Customizable Mega Menu - Snowdog Menu Luma and blank theme support

This module adds Javascript functionality and styles for the popular Snowdog Menu module for Luma and blank -based themes.

**Compatible with Magento Open-Source and Adobe Commerce, versions 2.4+.**

Magento Frontend Developer Documentation: [https://developer.adobe.com/commerce/frontend-core/guide/](https://developer.adobe.com/commerce/frontend-core/guide/)

Snowdog Menu module: [https://github.com/SnowdogApps/magento2-menu](https://github.com/SnowdogApps/magento2-menu)

## How To Setup

1. Install Snowdog Menu module:
```html
$ composer require snowdog/module-menu
```
1.1 Read more in Snowdog wiki: [https://github.com/SnowdogApps/magento2-menu/wiki/Setup](https://github.com/SnowdogApps/magento2-menu/wiki/Setup)

2. After install is complete, from admin > Content > Menus
2.1 To import your existing category structure click on "Create New Menu" > "Import from Categories"
2.2 Menu identifier should be set to: main-menu-top
2.3 Menu main CSS class should be set to: topnav-main

3. Clone and install SnowdogMenu extend module in your app/code folder:
```html
$ mkdir VendorX && cd VendorX

$ mkdir SnowdogMenu && cd SnowdogMenu

$ git clone git@github.com:ivallogenes/m2-snowdog-mega-menu.git .

$ bin/magento s:up
```
3.1 Override menu.phtml template from the Snowdog Menu module:
a. Create a folder named Snowdog_Menu in your theme
b. Copy the /templates folder from VendorX_SnowdogMenu into it

## Usage

1. Default layout of menu nodes is nested dropdowns.

2. To use full-width dropdown layout add the below css class to a top-level menu node:
a. full-width-menu-item

3. To use category image cards design layout add either of the below css classes to a top-level menu node:
a. full-width-menu-item image-grid image-grid--v1
b. full-width-menu-item image-grid image-grid--v2
3.1 Upload an Image for each of the child category items.

Checkout the screenshots.

Included icons provided by Heroicons: [https://heroicons.com](https://heroicons.com)

This is a tribute to the Snowdog Team and a contribution to the Magento Open Source community!

~ Share and enjoy! ~
