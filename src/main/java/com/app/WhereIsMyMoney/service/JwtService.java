package com.app.WhereIsMyMoney.service;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import java.util.Calendar;
import java.util.Date;


@Component
@NoArgsConstructor
public class JwtService {
    @Value("${jwt.Secret}")
    private String jwtSecret;
    @Value("${jwt.ExpirationMS}")
    private Integer jwtExp;

    public String generateJWT(Authentication authentication) {
        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();

        Claims claims = Jwts.claims().setSubject(principal.getUsername());
//        claims.put("role", );

        var calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR_OF_DAY, jwtExp);    //set token life limit to 24 hour
        Date lifeTimeToken = new Date(calendar.getTimeInMillis());

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .setExpiration(lifeTimeToken)
                .compact();
    }

    public boolean validateToken (String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException | IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
        return false;
    }

    public String getUserNameFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();

    }

}
