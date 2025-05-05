
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AdvancedFiltersProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const AdvancedFilters = ({ priceRange, setPriceRange }: AdvancedFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filtros Avançados
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Ajuste os filtros para encontrar a quadra ideal
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Faixa de Preço</h3>
            <div className="px-2">
              <Slider 
                defaultValue={priceRange} 
                max={500} 
                step={10}
                onValueChange={(value) => setPriceRange(value as number[])} 
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Comodidades</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="estacionamento" />
                <Label htmlFor="estacionamento">Estacionamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vestiario" />
                <Label htmlFor="vestiario">Vestiário</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lanchonete" />
                <Label htmlFor="lanchonete">Lanchonete</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chuveiro" />
                <Label htmlFor="chuveiro">Chuveiro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cobertura" />
                <Label htmlFor="cobertura">Quadra Coberta</Label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Disponibilidade</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="manha" />
                <Label htmlFor="manha">Manhã (6h - 12h)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tarde" />
                <Label htmlFor="tarde">Tarde (12h - 18h)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="noite" />
                <Label htmlFor="noite">Noite (18h - 23h)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="finsemana" />
                <Label htmlFor="finsemana">Fins de semana</Label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-gamesetGreen hover:bg-gamesetGreen/90">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedFilters;
