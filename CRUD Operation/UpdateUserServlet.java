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

@WebServlet("/api/user/*")
public class UpdateUserServlet extends HttpServlet{

	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPut(req, resp);
		
	    String name = req.getParameter("name");
        String address = req.getParameter("address");
        String state = req.getParameter("state");
        String district = req.getParameter("district");
        String dateOfBirth = req.getParameter("dateOfBirth");
        String language = req.getParameter("language");
        
		Connection con=null;
		PreparedStatement pstmt=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306?user=root&password=admin");
			pstmt = con.prepareStatement("update inhawk.user set SET address = ?, state = ?, district = ?, date_of_birth = ?, language = ? WHERE name = ?");
			pstmt.setString(1, address);
			pstmt.setString(2, state);
			pstmt.setString(3, district);
			pstmt.setString(4, dateOfBirth);
			pstmt.setString(5, language);
			
			pstmt.setString(6, name);
			pstmt.executeUpdate();
		}
		catch(SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}finally {
			try {
				if(pstmt!=null)pstmt.close();
				if(con!=null)con.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
}
