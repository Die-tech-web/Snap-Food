import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should request product list', (done) => {
    service.list().subscribe((res) => {
      expect(res).toEqual([{ id: '1', name: 'p' } as any]);
      done();
    });

    const req = http.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'p' }]);
  });
});
