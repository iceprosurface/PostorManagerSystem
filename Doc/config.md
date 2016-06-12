### 关于服务器设置问题

服务器由apache转换成nginx
配置文件如下
```
user  www;

worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    access_log  logs/access.log  main;

    sendfile        on;
    keepalive_timeout  65;


    server {
		listen       4000;
		server_name  localhost;
		index index.html;

		location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
			root /Users/icepro/Site/PostorManagerSystem/dest;
			expires 1m;
		}
		
	    location ~ ^/api/index\.php/?.*$ {
	        #root           html;
	        root /Users/icepro/Site/PostorManagerSystem/server;
	        
	        fastcgi_pass   127.0.0.1:9000;
	        fastcgi_index  index.php;
	        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
	        #include        fastcgi_params;
	        include        fastcgi.conf;
	    }
	    location ~ ^/api/(.*)$ {
	        if (!-e $request_filename) {
	            rewrite ^/api/(.*)$ /api/index.php?s=$1 last;
	            break;
	        }
	    }

	}
    include servers/*;
}
```

### PHP设置方面
开启errorlog

### mysql方面

各项参数保持不变，导入localhost.sql的数据做测试使用
