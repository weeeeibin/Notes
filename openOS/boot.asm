ORG	0x7c00
JMP read
NOP
DB "HELLO-OS"
DW 512
DB 8
DW 256
DB 2
DW 0
DW 0
DB 0xF8
DW 0
DW 63
DW 255
DD 256
DD 15950336

DD 15616
DW 0
DW 0
DD 2
DW 1
DW 6
RESB 12
DB 0
DB 0
DB 0x29
DB 0x15
DB 0x53
DB 0xFE
DB 0xB4
DB "HEOS       "
DB "FAT32   "

;从磁盘指定位置加载系统
read:
	mov	ax,0
	mov	ds,ax
	mov	es,ax
	mov ah,0x42
	mov dl,0x80
	mov si,packet
	int 0x13
	jnc ok
	
	mov si,0
	mov es,si
	mov ds,si
	mov [0x9000],ah
	mov bp,0x9000
	mov ax,01301h
	mov bh,0
	mov bl,0x0c
	mov cx,1
	mov dh,0
	mov dl,0
	int 0x10
	call error
	jmp $
	
Error:
	mov ax,0
	mov es,ax
	mov ds,ax
	mov ax,error
	mov bp,ax
	mov cx,11
	mov ax,01301h
	mov bx,000ch
	mov dl,0
	mov dh,0
	int 0x10
	
ok:
	mov ax,0
	mov es,ax
	mov ds,ax
	mov ax,load
	mov bp,ax
	mov cx,12
	mov ax,01301h
	mov bx,000ch
	mov dl,0
	mov dh,5
	int 0x10
	jmp 0x8000
	
error: db "Load Error"
load: db "Load Success"

;补齐引导剩余空间	
packet:
	db 10h
	db 0
	dw 1
	dw 0x8000
	dw 0
	dd 31752
	dd 0
	
times 510-($-$$)db 0
dw 0xaa55