import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    profissao: '',
    whatsapp: '',
    youtube: '',
    facebook: '',
    instagram: '',
    website: '',
  });

  const [logotipo, setLogotipo] = useState(null);
  const [fotos, setFotos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const onDropLogo = (acceptedFiles) => {
    setLogotipo(acceptedFiles[0]);
  };

  const onDropFotos = (acceptedFiles) => {
    setFotos(prevFotos => [...prevFotos, ...acceptedFiles].slice(0, 4));
  };

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: onDropLogo,
    accept: 'image/*',
    maxFiles: 1
  });

  const { getRootProps: getFotosRootProps, getInputProps: getFotosInputProps } = useDropzone({
    onDrop: onDropFotos,
    accept: 'image/*',
    maxFiles: 4
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    console.log(formData, logotipo, fotos);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Profissional</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="profissao">Profissão</Label>
          <Input type="text" id="profissao" name="profissao" value={formData.profissao} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Logotipo</Label>
          <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
            <input {...getLogoInputProps()} />
            <p>Arraste e solte o logotipo aqui, ou clique para selecionar</p>
          </div>
          {logotipo && <p className="mt-2">{logotipo.name}</p>}
        </div>
        <div>
          <Label>Fotos (máximo 4)</Label>
          <div {...getFotosRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
            <input {...getFotosInputProps()} />
            <p>Arraste e solte até 4 fotos aqui, ou clique para selecionar</p>
          </div>
          {fotos.length > 0 && (
            <ul className="mt-2">
              {fotos.map((foto, index) => (
                <li key={index}>{foto.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Label htmlFor="youtube">Canal do YouTube</Label>
          <Input type="url" id="youtube" name="youtube" value={formData.youtube} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input type="url" id="facebook" name="facebook" value={formData.facebook} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input type="url" id="instagram" name="instagram" value={formData.instagram} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input type="url" id="website" name="website" value={formData.website} onChange={handleInputChange} />
        </div>
        <Button type="submit" className="w-full">Cadastrar</Button>
      </form>
    </div>
  );
};

export default Cadastro;