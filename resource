Create Hosting in GCP


Create VM :
Enable Enable connecting to serial ports
Allow HTTP traffic
Allow HTTPS traffic


Buka SSH di VM

Install 
sudo apt-get update
sudo apt-get install apache2

Buat Direktori
sudo mkdir -p /var/www/html/public_html

Beri Akses Permission
sudo chown -R $USER:$USER /var/www/html/public_html
sudo chmod -R 755 /var/www

Membuat Halaman Demo
cd /var/www/html/public_html
sudo nano index.html
sudo nano style.css
sudo nano script.js

Buat Virtual Host
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/website-1.conf

sudo nano /etc/apache2/sites-available/website-1.conf

Isi file :
<VirtualHost *:80>
    ServerAdmin admin@website-1.com
    ServerName DomainAnda.com
    ServerAlias www.DomainAnda.com
    DocumentRoot /var/www/html/public_html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

Mengaktifkan File Virtual Host
sudo a2ensite website-1.conf

sudo a2dissite 000-default.conf

sudo systemctl restart apache2

Cek Hasil
Buka External IP di VM

Create Firewall
Create Firewall - Logs On
Enable IP di Firewall bagian Networking

















Resource : 
https://www.codepolitan.com/membuat-virtual-host-apache-di-ubuntu-1604-59e6e64e472e1 
https://www.niagahoster.co.id/blog/virtual-host/
https://cloud.google.com/compute/docs/tutorials/basic-webserver-apache 
https://cloud.google.com/vpc/docs/using-firewalls 
