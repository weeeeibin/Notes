#  macOS 安装笔记
> 版本：macOS Mojave 10.14.6 <br/>
> 提示：<br/>
&emsp; 1.如果您的N卡支持GSYNC技术 安装笔记将不适合您 N卡用户请安装10.13版本使用WebDriver驱动<br/>
&emsp;&emsp; &emsp; 10.13后的系统不支持WebDriver 但能拥有小部分N卡能够免驱<br/>
&emsp; 2.笔记本需要拥有集成显卡、AMD免驱显卡、NVIDIA免驱显卡<br/>
&emsp; 3.笔记本需要有免驱无线网卡或usb免驱无线网卡才能使用无线局域网 蓝牙设备可能受到影响<br/>
&emsp; 4.没有什么问题是配置EFI解决不了的 如果有那就在配置一下<br/>

### 制作安装盘
+ 下载dmg系统镜像 [下载链接](https://blog.daliansky.net/macOS-Mojave-10.14.6-18G87-Release-version-with-Clover-5033-original-image.html) 默认EFI可直接驱动部分设备
+ 下载balenaEtcher 准备一个8G以上的U盘
+ 制作安装盘
	+ 插入U盘打开balenaEtcher 点击Select image选择下载好的dmg文件 //如有提示点击continue
	+ 点击Select Drive 选择U盘
	+ 点击Flash开始制作U盘
	+ 制作过程可能会持续一小时 因U盘速度而定！！！
+ 返回桌面右键 计算机>管理>磁盘管理
	+ 选择需要安装的磁盘分区
	+ 右键点击删除卷 > 新建简单卷 > 不分配驱动号 > 下一步 > 不格式化

### 安装系统
+ 将安装盘插入需要安装的电脑
+ 开机选择从安装U盘引导
+ 进入Clover 选择 Boot MacOS install from install macOS Mojave
	+ 如果无法进入安装界面或卡在某处请根据错误信息更换EFI文件
+ 点击磁盘工具
	+ 抹掉要安装系统的磁盘 格式：APFS
	+ 返回安装界面
+ 返回点击安装macOS
+ 选择要安装的磁盘 一路下一步即可

###EFI 驱动制作
	驱动需要放置在/EFI/CLOVER/kexts/Other
+ 电池驱动 [ACPIBatteryManager.kext](https://bitbucket.org/RehabMan/os-x-acpi-battery-driver/downloads/)
+ 声卡驱动 [AppleALC.kext](https://github.com/acidanthera/AppleALC/releases)
	+ [支持声卡型号及ID](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)
	+ 打开/EFI/CLOVER/config.plist
	+ 搜索Audio 修改内容
	```xml
	//仅修改提及的标签 没有的标签按样式添加即可 Audio内其他部分请勿删除！
	//如果声卡id用逗号分开 一个一个试直到成功
	<dict>
		<key>inject</key>
		<string>声卡id</string>
		<key>ResetHDA</key>
		<true/>
	</dict>
	```
	+ 没有兼容显卡可以尝试万能驱动 无需配置 但可能会破音、声音小等未知问题
	+ 万能驱动名称：VoodooHD.kext
+ 集成显卡id注入
	+ [集成显卡ID对照表](https://www.jianshu.com/p/f78f48f677c7?tdsourcetag=s_pctim_aiomsg)
	+ 打开/EFI/CLOVER/config.plist
	+ 搜索Graphics 修改key为ig-platform-id内string标签的值为集成显卡id
	```xml
	<key>ig-platform-id</key>
	<string>显卡id</string>
	```
+ 背光驱动 [AppleBacklightFixup.kext/SSDT-PNLF.aml](https://bitbucket.org/RehabMan/applebacklightfixup/downloads/)
	+ 将 AppleBacklightFixup.kext 移动到 EFI\EFI\CLOVER\kexts\Other 目录下
	+ SSDT-PNLF.aml 移动到 /EFI/Clover/ACPI/Patched/ 目录下


![macos](https://github.com/814792647/Notes/blob/master/macOS/macos.png "macos")