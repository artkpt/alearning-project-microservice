package com.example.alearning.apigateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder()
                .filter((request, next) ->
                        ReactiveSecurityContextHolder.getContext()
                                .filter(context -> context.getAuthentication() != null
                                        && context.getAuthentication().getPrincipal() instanceof Jwt)
                                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                                .flatMap(jwt -> {
                                    String userId = jwt.getClaimAsString("uid");

                                    // custom header
                                    ClientRequest mutatedRequest = ClientRequest.from(request)
                                            .header("x-user-id", userId)
                                            .build();

                                    return next.exchange(mutatedRequest);
                                })

                                //if not have token pass without custom header
                                .switchIfEmpty(next.exchange(request))
                );
    }
}

