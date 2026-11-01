"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const initialFormData = {
  name: '',
  birthDate: '',
  birthParish: '',
  deathDate: '',
  deathParish: '',
  occupation: '',
  lifeStory: '',
};

const LOCAL_STORAGE_KEY = 'genealogyData';

export function GenealogyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      toast({
        title: 'Sparat!',
        description: 'Informationen har sparats lokalt i din webbläsare.',
      });
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      toast({
        variant: 'destructive',
        title: 'Fel vid sparande',
        description: 'Kunde inte spara informationen.',
      });
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove data from localStorage", error);
    }
    toast({
      title: 'Rensat!',
      description: 'Formuläret har rensats och är redo för en ny person.',
    });
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Släktforskning</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka
            </Link>
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Spara
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <Trash2 className="mr-2 h-4 w-4" /> Rensa
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="font-headline">Personuppgifter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Namn</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Förnamn Efternamn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Födelsedatum</Label>
                <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthParish">Födelseförsamling</Label>
                <Input id="birthParish" name="birthParish" value={formData.birthParish} onChange={handleChange} placeholder="Ex: Storkyrkoförsamlingen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathDate">Dödsdatum</Label>
                <Input id="deathDate" name="deathDate" type="date" value={formData.deathDate} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathParish">Dödsförsamling</Label>
                <Input id="deathParish" name="deathParish" value={formData.deathParish} onChange={handleChange} placeholder="Ex: Klara församling" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Yrke</Label>
                <Input id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Ex: Smed, Bonde, Lärarinna" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <Card className="shadow-lg flex-grow flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Levnadshistoria</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <Textarea
                id="lifeStory"
                name="lifeStory"
                value={formData.lifeStory}
                onChange={handleChange}
                placeholder="Berätta om personens liv, familj, viktiga händelser..."
                className="flex-grow resize-none text-base min-h-[500px] lg:min-h-0"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
