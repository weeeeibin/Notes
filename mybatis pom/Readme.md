######  pom.xml
```XML
 	<!--##########################mybatis start##############################-->

		<dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.6</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>

    <!--##########################mybatis end##############################-->
```

######  mybatis-config.xml
```XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<properties resource="db.properties"></properties>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="${driver}" />
				<property name="url" value="${url}" />
				<property name="username" value="${username}" />
				<property name="password" value="${password}" />
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="mapper/testMapper.xml" />
	</mappers>
</configuration>
```

######  Java class
```Java
	String  resource = "mybatis-config.xml";	
	InputStream in = Resources.getResourceAsStream(resource);
	SqlSessionFactoryBuilder ssfb = new SqlSessionFactoryBuilder();
	SqlSessionFactory ssf = ssfb.build(in);
	SqlSession session = ssf.openSession();
	User user = session.selectOne("testMapper.selectUser",1);
	return user;
```

