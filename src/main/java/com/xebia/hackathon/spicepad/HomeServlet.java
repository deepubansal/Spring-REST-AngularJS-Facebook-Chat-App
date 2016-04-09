package com.xebia.hackathon.spicepad;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HomeServlet extends HttpServlet {

    private static final long serialVersionUID = 1787075171267113877L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException {

        String signed_request = request.getParameter("signed_request");

        if (signed_request != null) {

            System.out.println("signed_request: " + signed_request);

            String payload = signed_request.substring(signed_request.indexOf(".") + 1);
            System.out.println("payload: " + payload);

            String decoded_payload = new String(Base64.decodeBase64(payload));
            System.out.println("decoded_payload: " + decoded_payload);

            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode tree = mapper.reader().readTree(decoded_payload);
                JsonNode appDataObj = tree.get("app_data");
                if (appDataObj != null) {
                    String[] appData = appDataObj.asText().split("_");
                    if (appData.length >= 2) {
                        request.setAttribute("flightNo", appData[0]);
                        request.setAttribute("date", appData[1]);
                    }
                }
                RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
                requestDispatcher.forward(request, resp);
                
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }
}
