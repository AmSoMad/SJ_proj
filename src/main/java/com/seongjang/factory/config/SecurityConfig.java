package com.seongjang.factory.config;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.AllArgsConstructor;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
//    private final UserDetailsService userDetailsService;
//	  private final AuthenticationSuccessHandler formAuthenticationSuccessHandler;
//    private final AuthenticationFailureHandler formAuthenticationFailureHandler;
//    private final DataSource dataSource;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		/* super.configure(http); */
		http.authorizeRequests()
				.mvcMatchers(
				"/"
				,"/*"
				,"/home/*"
				,"/location/*"
				,"/pages/*"
				,"/common/*/*"
				,"/industrial/*"
				,"/resources/sandan/*/*"
				,"http://localhost:8080/*"
				).permitAll().anyRequest().authenticated();

        // csrf
        // TODO 비동기호출(ajax호출시) csrf header에 추가 하고 disable 삭제
        http.csrf().disable();
        
        
// 나중에하자
//        // formLogin
//        http.formLogin()
//                .loginPage("/user/login").permitAll()
//                .loginProcessingUrl("/")
//                .defaultSuccessUrl("/", true)
//                .successHandler(formAuthenticationSuccessHandler)
//                .failureHandler(formAuthenticationFailureHandler)
//        ;
////
//        http.exceptionHandling()
//                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/account/sign_in"))
//                .accessDeniedPage("/denied")
//        ;
////
//        // logout 처리(POST)
//        http.logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                .logoutSuccessUrl("/")
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID", "");;
	}

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .mvcMatchers("/resources/**")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }


    //로그인단 만들면쓰자.

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}



}
