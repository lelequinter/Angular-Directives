import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  params = {};

  transactionId = '';
  transactionData: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.transactionId = (params as any).id;
    });

    this.http
      .get(`${environment.wompi_transactions}${this.transactionId}`)
      .pipe(
        catchError(err => err)
      )
      .subscribe({
        next: (res: any) => {
          console.log('@next', res);
          this.transactionData = res.data
        },
        error: (err) => {
          console.log('@err', err);
        },
        complete: () => {
          console.log('@complete');
        },
      });
  }

  validateAmount(): number{
    const cop: number = this.transactionData?.amount_in_cents/100;
    return cop || 0;
  }

  status: any = {
    APPROVED: 'Transacción aprobada',
    DECLINED: 'Transacción declinada',
    ERROR: 'Transacción con error',
  }

  transactionStatus(){
    return this.status[this.transactionData?.status]
  }

  transformDate(){
    const BogotaTimeZone = 'America/Bogota';
    DateTime.utc().setZone(BogotaTimeZone);

    const fecha = DateTime.fromISO(this.transactionData.created_at)
                          .setLocale('es-ES')
                          .toFormat("dd/LLLL/yyyy 'Hora:' HH:mm:ss");

    return fecha;
  }

  redirectToCart(){
    this.router.navigateByUrl('/wompi')
  }

  redirectToHome(){
    this.router.navigateByUrl('/home')
  }
}
