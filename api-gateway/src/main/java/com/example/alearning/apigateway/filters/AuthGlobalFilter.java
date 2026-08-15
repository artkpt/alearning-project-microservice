package com.example.alearning.apigateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // ดึงข้อมูลผู้ใช้จาก Spring Security Context
        return ReactiveSecurityContextHolder.getContext()
                .filter(context -> context.getAuthentication() != null 
                        && context.getAuthentication().getPrincipal() instanceof Jwt)
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .flatMap(jwt -> {

                    String userId = jwt.getClaimAsString("uid");

                    ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                            .header("x-user-id", userId)
                            .build();

                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                })

                .switchIfEmpty(chain.filter(exchange));
    }

    @Override
    public int getOrder() {

        return -100; 
    }
}