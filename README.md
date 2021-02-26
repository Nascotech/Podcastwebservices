# **Admin panel angular source** #
By Atunwa

**Project Link**: https://gitlab.com/atunwa/admin-panel-angular-source

**Setup Project - local server**

* Step 1: Pull code from **`$ git clone https://gitlab.com/atunwa/admin-panel-angular-source.git atunwa_admin_panel_source`**
* Step 2: Go to directory **`$ cd atunwa_admin_panel_source`**
* Step 2: Checkout dev branch **`$ git checkout dev`**
* Step 3: Install dependency **`$ npm install`**
* Step 4: Start server **`$ ng serve --poll=2000`**

**Build files for production server**

* Step 5: Create build files for production server **`$ ng build --prod`**
* Step 6: Go to directory where files generated **`$ cd dist/atunwa-angular`**
* Step 7: Copy all files and paste (First setup project in local): https://gitlab.com/atunwa/admin-panel-build
* Step 6: Push build code (**`$ git push origin dev`**)
* Step 7: Pull from live server (**`$ git pull origin dev`**)
