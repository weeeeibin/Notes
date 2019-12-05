ORG 0x8000

;打印load内容
mov ax,0
mov es,ax
mov ds,ax
mov ax,load
mov bp,ax
mov cx,15
mov ax,01301h
mov bx,000ch
mov dl,0
mov dh,6
int 0x10
;内存大小
mov bx,10
mov si,15
mov dx,0
mov ds,dx
int 0x12
;十进制转ascii
memorysize:
div bx
or dl,30h
push dx
mov dx,0
sub si,1
cmp ax,0
jnz memorysize
;输出内存大小
pop ax
mov [memory+13],ax
pop ax
mov [memory+14],ax
pop ax
mov [memory+15],ax
mov ax,"KB"
mov [memory+16],ax
mov ax,memory
mov bp,ax
mov cx,18
mov ax,01301h
mov bx,000ch
mov dl,0
mov dh,7
int 0x10
;设置光标位置
mov ah,2
mov bh,0
mov dh,8
mov dl,0
int 0x10


pe:
	mov ax,0
	mov cs,ax
	mov ss,ax
	mov sp,0x7c00
	
	mov ax,[cs:gdt_base+0x7c00]
	mov dx,[cs:gdt_base+0x7c00+0x02]
	mov bx,16
	div bx
	mov ds,ax
	mov bx,dx


scan:
	mov ax,0
	mov ds,ax
	mov ah,0
	int 0x16
	cmp al,0
	je scan
	jmp print
	
print:
	mov ah,0eh
	mov bh,0
	int 0x10
	jmp scan
	
memory:
	db "Memory size:"
	db 0
	db 0
	db 0
	db 0
load: 
	db "Load From Disk"
	db 0x0a
	
gdt_size	dw 0
gdt_base	dd 0x00007e00