@echo off
set PHPRC=d:\React Projects\vcardsaas-70nulled\codecanyon-34885397-vcard-saas-digital-business-card-builder-bio-links-builder\main-file
cd /d "d:\React Projects\vcardsaas-70nulled\codecanyon-34885397-vcard-saas-digital-business-card-builder-bio-links-builder\main-file"

:: Start MySQL service if not running
net start MySQL84 2>nul

:: Start Vite dev server in background
start "Vite" cmd /c "npm run dev"

:: Start Laravel server (foreground)
php artisan serve --host=127.0.0.1 --port=8000
