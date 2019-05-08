package bsu.practice.service.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "debug", urlPatterns = "*")
public class DebugFilter implements Filter {

    @Override
    public void init(FilterConfig fc) {}

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        long start =  System.nanoTime();
        chain.doFilter(req, resp);
        long end = System.nanoTime();
        HttpServletRequest httpReq = (HttpServletRequest)req;
        HttpServletResponse httpResp = (HttpServletResponse)resp;
        StringBuffer URL = httpReq.getRequestURL();
        StringBuilder newURL = new StringBuilder(URL);
        newURL.append("?");

        String query = httpReq.getQueryString();
        if (query != null) {
            newURL.append(query);
            newURL.append("&");
        }
        if (query == null || !query.contains("method")) {
            newURL.append("method=");
            newURL.append(httpReq.getMethod());
            newURL.append("&URL=");
            newURL.append(URL.toString());
            newURL.append("&time=");
            newURL.append((end - start) / 1000000);
            newURL.append("ms");
            httpResp.sendRedirect(newURL.toString());
        }
        else {
            chain.doFilter(req, resp);
        }
    }

    @Override
    public void destroy() {}

}
