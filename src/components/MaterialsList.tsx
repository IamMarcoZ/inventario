import {Component } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import "../css/list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/esm/Table";

export interface IMaterialListProps {}
export interface IMaterialListState {
  isSearching: boolean;
  materials: any;
  serial: number;
}

export class MaterialsList extends Component<
  IMaterialListProps,
  IMaterialListState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSearching: false,
      serial: 0,
      materials: [],
    };

    this.searchMaterial = this.searchMaterial.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.increment = this.increment.bind(this);
  }

  async componentDidMount() {
    await this.fetchList();
    const materialDoc = doc(db, "bioware-9e508-default-rtdb.europe-west1.firebasedatabase.app/Materials");
    console.log(materialDoc, "materialDoc");
  }

  render() {
    return (
      <div className="materialsList">
        <div className="searchDiv">
          <input
            id="search"
            className="searchMaterial"
            type="text"
            placeholder="Cerca per nome"
            onChange={(e) => this.searchMaterial(e)}
          />
        </div>
        <div>
          <Table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Materiale</th>
                <th>Posizione</th>
                <th>Prezzo</th>
                <th>Fornitore</th>
                <th>Quantità</th>
                <th>Ultimo Prelievo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.materials.map((material: any, index: number) => {
                return (
                  <tr>
                    <td key={index}>{index + 1}</td>
                    <td>{material.materialName}</td>
                    <td>{material.position}</td>
                    <td>
                      {material.price} {"€"}
                    </td>
                    <td>{material.vendor} </td>
                    <td>{material.quantity + " Kg"}</td>
                    <td>{material.withdrawal}</td>
                    <td className="btnTd">
                      <input
                        id={`incrementInput${index + 1}`}
                        className="operationInput"
                        type="number"
                      />
                      <button
                        className="operationBtn"
                        type="button"
                        onClick={() =>
                          this.increment(material.id, material.quantity, index)
                        }
                      >
                        Aggiungi
                      </button>{" "}
                    </td>
                    <td className="btnTd">
                      <input
                        id={`withdrawInput${index + 1}`}
                        className="operationInput"
                        type="number"
                      />
                      <button
                        className="operationBtn"
                        type="button"
                        onClick={() =>
                          this.withdraw(material.id, material.quantity, index)
                        }
                      >
                        Preleva
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  private async fetchList() {
    const materialsDbRef = collection(db, "/Materials");
    await getDocs(materialsDbRef).then((response) =>
      this.setState({
        materials: response.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      })
    );
  }
  private increment(id: any, quantity: any, index: any) {
    try {
      const materialsDoc = doc(db, "Materials", id);
      const sum = Number(
        (
          document.getElementById(
            `incrementInput${index + 1}`
          ) as HTMLInputElement
        ).value
      );
      const newQuantity = quantity + sum;
      console.log(materialsDoc, "materialsDoc");
      console.log(sum, "sum");
      updateDoc(materialsDoc, {
        quantity: newQuantity,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.fetchList();
    }
  }

  private withdraw(id: any, quantity: any, index: any) {
    try {
      const materialsDoc = doc(db, "Materials", id);
      const withdraw = Number(
        (
          document.getElementById(
            `withdrawInput${index + 1}`
          ) as HTMLInputElement
        ).value
      );
      const newQuantity = quantity - withdraw;
      console.log(materialsDoc, "materialsDoc");
      console.log(withdraw, "withdraw");
      updateDoc(materialsDoc, {
        quantity: newQuantity,
        withdrawal:
          new Date().toLocaleDateString() + " " + withdraw + " " + "Kg",
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.fetchList();
    }
  }

  private async searchMaterial(e: any) {
    let filteredList: any = [];
    let name = e.target.value.toUpperCase();
    console.log(name);

    try {
      if (name.length > 0 && name !== undefined) {
        const materialsDbRef = collection(db, "Materials");
        await getDocs(materialsDbRef).then((response) => {
          const materials = response.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }));
          materials.filter((material: any) => {
            if (material.materialName.toUpperCase().includes(name)) {
              filteredList.push(material);
              this.setState({ materials: filteredList });
            }
          });
        });
      }
      if (!name && name !== undefined) {
        this.fetchList();
      }
    } catch (e: any) {
      console.log(e);
    }
  }
  private async searchMaterialByPosition(e: any) {
    let filteredList: any = [];
    let inputPosition = e.target.value.toUpperCase();

    try {
      if (inputPosition.length > 0 && inputPosition !== undefined) {
        const materialsDbRef = collection(db, "Materials");
        await getDocs(materialsDbRef).then((response) => {
          const materials = response.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }));
          materials.filter((material: any) => {
            if (material.position.toUpperCase().includes(inputPosition)) {
              filteredList.push(material);
              this.setState({ materials: filteredList });
            }
          });
        });
      }
      if (!inputPosition && inputPosition !== undefined) {
        this.fetchList();
      }
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default MaterialsList;
