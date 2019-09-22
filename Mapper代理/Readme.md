### Mapper.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="controller.UserMapper">
	<select id="selectUser" parameterType="integer" resultType="model.User">
		select * from students where id = #{id} 
	</select>
</mapper>
```

### UserMapper.java
```Java
//Mapper 接口
/*
    1.方法名字与 Mapper.xml id 一致
    2.形参类型与 Mapper.xml parameterType 一致
    3.返回类型与 Mapper.xml resultType 一致
    4.Mppaer.xml namespace 与 接口全包名一致
*/
public interface UserMapper {
	public User selectUser(Integer id);
}
```

### 调用方法.java
```Java
public User UserMapperTest() {
	String  resource = "mybatis-config.xml";	
	InputStream in;
	try {
		in = Resources.getResourceAsStream(resource);
		SqlSessionFactory ssf = new SqlSessionFactoryBuilder().build(in);
		SqlSession session = ssf.openSession();
		UserMapper mapper = session.getMapper(UserMapper.class);
		User user = mapper.selectUser(1);
		return user;
	} catch (IOException e) {
		e.printStackTrace();
		return null;
    	}
}
```

