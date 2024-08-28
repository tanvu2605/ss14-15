import { GetServerSideProps } from "next";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductsPageProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", marginRight: "10px" }}
            />
            <div>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
