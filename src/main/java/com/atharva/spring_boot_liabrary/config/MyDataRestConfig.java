package com.atharva.spring_boot_liabrary.config;

import com.atharva.spring_boot_liabrary.entity.Book;
import com.atharva.spring_boot_liabrary.entity.Message;
import com.atharva.spring_boot_liabrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigin="http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PATCH};


        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);

    disableHttpMethods(Book.class,config,theUnsportedActions);
    disableHttpMethods(Review.class,config,theUnsportedActions);
        disableHttpMethods(Message.class,config,theUnsportedActions);

        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigin);
    }
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }



}
