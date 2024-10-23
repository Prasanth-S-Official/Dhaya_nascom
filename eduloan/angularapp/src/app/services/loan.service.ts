import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  public apiUrl = apiUrl; // Update with your API URL

  constructor(private http: HttpClient) { }

  getAllLoans(): Observable<Loan[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Loan[]>(`${this.apiUrl}/api/loan`, { headers });
  }

deleteLoan(loanId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/loan/${loanId}`, { headers });
}

  getLoanById(id: string): Observable<Loan> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Loan>(`${this.apiUrl}/api/loan/${id}`, { headers });
}

  addLoan(requestObject: Loan): Observable<Loan> {

    console.log(requestObject)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<Loan>(`${this.apiUrl}/api/loan`, requestObject, { headers });

  }

updateLoan(id: string, requestObject: Loan): Observable<Loan> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<Loan>(`${this.apiUrl}/api/loan/${id}`, requestObject, { headers });
}


  getAppliedLoans(userId: string): Observable<LoanApplication[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/api/loanapplication/user/${userId}`, { headers });
}

  deleteLoanApplication(loanId: string): Observable<void> {
    console.log('deleteloanId', loanId);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/loanapplication/${loanId}`, { headers });
  }


  addLoanApplication(data: LoanApplication): Observable<LoanApplication> {

     const body =  
     {
      // "username": data.username,
       "course": data.course,
       "address": data.address,
       "file": data.file,
       "loanStatus": data.loanStatus,
       "submissionDate":data.submissionDate,
       "institution":data.institution,
       "tutionFee":data.tuitionFee,
       "loan": {
         "loanId": Number(localStorage.getItem('loanId'))
       },
       "user":
       {
         "userId":Number(localStorage.getItem('userId'))
       }
     }
     console.log(body);  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<LoanApplication>(`${this.apiUrl}/api/loanapplication`, body, { headers });
}


getAllLoanApplications(): Observable<LoanApplication[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/api/loanapplication`, { headers });
}

updateLoanStatus(id: string, loanApplication: LoanApplication): Observable<LoanApplication> {
    console.log('updateLoanStatus', id, loanApplication);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<LoanApplication>(`${this.apiUrl}/api/loanapplication/${id}`, loanApplication, { headers });
}
}
