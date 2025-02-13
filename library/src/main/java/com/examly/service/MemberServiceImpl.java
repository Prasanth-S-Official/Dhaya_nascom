package com.examly.service;

import com.examly.entity.Member;
import com.examly.service.MemberService;
import com.examly.util.DBConnectionUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberServiceImpl implements MemberService {

    private Connection connection;

    public MemberServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public void addMember(Member member) {
        try {
            String query = "INSERT INTO members (name, email, phoneNumber) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, member.getName());
            statement.setString(2, member.getEmail());
            statement.setString(3, member.getPhoneNumber());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateMember(Member member) {
        try {
            String query = "UPDATE members SET name = ?, email = ?, phoneNumber = ? WHERE memberId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, member.getName());
            statement.setString(2, member.getEmail());
            statement.setString(3, member.getPhoneNumber());
            statement.setInt(4, member.getMemberId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteMember(int memberId) {
        try {
            String query = "DELETE FROM members WHERE memberId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, memberId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Member getMemberById(int memberId) {
        try {
            String query = "SELECT * FROM members WHERE memberId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, memberId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Member member = new Member();
                member.setMemberId(resultSet.getInt("memberId"));
                member.setName(resultSet.getString("name"));
                member.setEmail(resultSet.getString("email"));
                member.setPhoneNumber(resultSet.getString("phoneNumber"));
                return member;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Member> getAllMembers() {
        List<Member> members = new ArrayList<>();
        try {
            String query = "SELECT * FROM members";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Member member = new Member();
                member.setMemberId(resultSet.getInt("memberId"));
                member.setName(resultSet.getString("name"));
                member.setEmail(resultSet.getString("email"));
                member.setPhoneNumber(resultSet.getString("phoneNumber"));
                members.add(member);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return members;
    }
}
