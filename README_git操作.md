 git的六个步骤（图）
    具体操作：
        1、创建本地仓库
              建立.gitignore文件
              git init  == 工作区
              git add * ==工作区的放到暂存区
              git commit  -m '' ==将暂存区的放到版本区
        2、创建远程仓库（空）
           关联：git remote add origin 
        3、将本地代码推送到远程仓库：git push origin master
        4、  本地写新文件或修改文件，本地管理好再推送到远程。
        5、远程写新文件或修改文件，本地拉取
        6、clone