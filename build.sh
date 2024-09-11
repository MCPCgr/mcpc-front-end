export NODE_OPTIONS=--max-old-space-size=8192
npx nuxi generate
rm -R /home/tatatonga/web/tatatonga.com/public_html/admin
rm -R /home/tatatonga/web/tatatonga.com/public_html/auth
rm -R /home/tatatonga/web/tatatonga.com/public_html/lambda_admin
rm -R /home/tatatonga/web/tatatonga.com/public_html/form
rm -R /home/tatatonga/web/tatatonga.com/public_html/company
rm -R /home/tatatonga/web/tatatonga.com/public_html/user
rm -R /home/tatatonga/web/tatatonga.com/public_html/attendance
mv .output/public/admin /home/tatatonga/web/tatatonga.com/public_html/admin
mv .output/public/auth /home/tatatonga/web/tatatonga.com/public_html/auth
mv .output/public/lambda_admin /home/tatatonga/web/tatatonga.com/public_html/lambda_admin
mv .output/public/form /home/tatatonga/web/tatatonga.com/public_html/form
mv .output/public/company /home/tatatonga/web/tatatonga.com/public_html/company
mv .output/public/user /home/tatatonga/web/tatatonga.com/public_html/user
mv .output/public/attendance /home/tatatonga/web/tatatonga.com/public_html/attendance
