package com.app.WhereIsMyMoney;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class WhereIsMyMoneyApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(WhereIsMyMoneyApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
