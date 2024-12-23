package com.inhawk.CRUD_App;

import java.io.IOException;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
@WebServlet("/user")
public class GetUserServlet extends HttpServlet  {

	 @Override
	    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	        String name = req.getParameter("name");
	        
	        Connection con = null;
	        PreparedStatement pstmt = null;
	        ResultSet rs = null;
	        
	        try {
	            // Initialize the MySQL driver and create a connection
	        	Class.forName("com.mysql.jdbc.Driver");
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306?user=root&password=admin");
	            
	            // Query to fetch user data by name
	            String sql = "SELECT * FROM user WHERE name = ?";
	            pstmt = con.prepareStatement(sql);
	            pstmt.setString(1, name);
	            
	            rs = pstmt.executeQuery();
	            
	            if (rs.next()) {
	                // Assuming the user table has columns: name, address, state, district, date_of_birth, language
	                String address = rs.getString("address");
	                String state = rs.getString("state");
	                String district = rs.getString("district");
	                String dateOfBirth = rs.getString("date_of_birth");
	                String language = rs.getString("language");
	                
	                // Create a JSON response with the user data
	                String jsonResponse = String.format("{\"name\":\"%s\",\"address\":\"%s\",\"state\":\"%s\",\"district\":\"%s\",\"dateOfBirth\":\"%s\",\"language\":\"%s\"}",
	                        name, address, state, district, dateOfBirth, language);
	                
	                resp.setContentType("application/json");
	                resp.getWriter().write(jsonResponse);
	            } else {
	                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
	                resp.getWriter().write("{\"message\":\"User not found\"}");
	            }
	        } catch (SQLException | ClassNotFoundException e) {
	            e.printStackTrace();
	            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            resp.getWriter().write("{\"message\":\"Error fetching user data\"}");
	        } finally {
	            try {
	                if (rs != null) rs.close();
	                if (pstmt != null) pstmt.close();
	                if (con != null) con.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	
}
