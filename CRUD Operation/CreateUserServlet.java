package com.inhawk.CRUD_App;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api/user/create")
public class CreateUserServlet extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
		String name=req.getParameter("name");
		String address=req.getParameter("address");
		String state=req.getParameter("state");
		String district=req.getParameter("district");
		String dateOfBirth=req.getParameter("dateOfBirth");
		String language=req.getParameter("language");
		
		Connection con = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306?user=root&password=admin");
			pstmt = con.prepareStatement("insert into inhawk.user values(?,?,?,?,?,?)");
			pstmt.setString(1, name);
			pstmt.setString(2, address);
			pstmt.setString(3, state);
			pstmt.setString(4, district);
			pstmt.setString(5, dateOfBirth);
			pstmt.setString(6, language);
			int rowsInserted = pstmt.executeUpdate();
//            resp.setContentType("application/json");
//            if (rowsInserted > 0) {
//                resp.getWriter().write("{\"success\": true, \"message\": \"User created successfully\"}");
//            } else {
//                resp.getWriter().write("{\"success\": false, \"message\": \"Failed to create user\"}");
//            }
			
		}catch(SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}finally {
			try {
				if(pstmt!=null) pstmt.close();
				if(con!=null) con.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}

	}
	
}
