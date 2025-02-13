package com.examly.service;

import com.examly.entity.Member;
import java.util.List;

public interface MemberService {
    void addMember(Member member);
    void updateMember(Member member);
    void deleteMember(int memberId);
    Member getMemberById(int memberId);
    List<Member> getAllMembers();
}
