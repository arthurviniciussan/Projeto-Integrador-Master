import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-bloco-consulta-de-produtos',
  standalone: true,
  imports: [], 
  templateUrl: './consulta-produtos.html', 
  styleUrls: ['./consulta-produtos.css'],  
})
export class ConsultaProdutos implements OnInit {
  private router = inject(Router); 

 
  produto: any = null;

  constructor() {
    const navegacao = this.router.getCurrentNavigation();
    const estado = navegacao?.extras.state as { produto: any };
    
    if (estado && estado.produto) {
      this.produto = estado.produto;
    }
  }

  ngOnInit(): void { }


  voltar(): void {
    this.router.navigate(['/produtos']);
  }


  editarProduto(): void {
    if (this.produto) {
      this.router.navigate(['/editar-produto'], { state: { produto: this.produto } });
    }
  }
}
