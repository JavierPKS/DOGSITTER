import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Sigma, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Activity, 
  PlusCircle, 
  ChevronRight,
  Fish,
  ShoppingBag,
  Cpu
} from 'lucide-react';
import { Recipe, Ingredient } from '../types';

interface RecipeManagementProps {
  recipes: Recipe[];
  onSaveRecipe: (updatedRecipe: Recipe) => void;
  onGoBack: () => void;
}

export default function RecipeManagement({ 
  recipes, 
  onSaveRecipe,
  onGoBack 
}: RecipeManagementProps) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'REC-2049');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sync selected recipe detail
  useEffect(() => {
    const found = recipes.find(r => r.id === selectedRecipeId);
    if (found) {
      // Create a deep copy of search results so edits are local till saved
      setActiveRecipe(JSON.parse(JSON.stringify(found)));
    }
  }, [selectedRecipeId, recipes]);

  if (!activeRecipe) {
    return <div className="p-8">Cargando los parámetros de receta...</div>;
  }

  // Filter recipes left sidebar
  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Ingredient row change handler
  const handleIngredientChange = (id: string, field: keyof Ingredient, value: any) => {
    if (!activeRecipe) return;
    
    const updatedIngredients = activeRecipe.ingredients.map(ing => {
      if (ing.id === id) {
        return { 
          ...ing, 
          [field]: field === 'quantity' ? (parseFloat(value) || 0) : value 
        };
      }
      return ing;
    });

    setActiveRecipe({
      ...activeRecipe,
      ingredients: updatedIngredients
    });
  };

  // Add new row to matrix
  const handleAddIngredient = () => {
    if (!activeRecipe) return;
    
    const newIng: Ingredient = {
      id: `ing-${Date.now()}`,
      name: 'Nuevo ingrediente orgánico',
      quantity: 50,
      unit: 'g'
    };

    setActiveRecipe({
      ...activeRecipe,
      ingredients: [...activeRecipe.ingredients, newIng]
    });
  };

  // Delete row from matrix
  const handleDeleteIngredient = (ingId: string) => {
    if (!activeRecipe) return;
    
    const remaining = activeRecipe.ingredients.filter(ing => ing.id !== ingId);
    setActiveRecipe({
      ...activeRecipe,
      ingredients: remaining
    });
  };

  // Save recipe state back
  const handleSave = () => {
    if (!activeRecipe) return;
    onSaveRecipe(activeRecipe);
    setStatusMessage('¡Parámetros de la receta guardados de manera exitosa en el motor de cálculo!');
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Discard current sandbox changes
  const handleDiscard = () => {
    const original = recipes.find(r => r.id === selectedRecipeId);
    if (original) {
      setActiveRecipe(JSON.parse(JSON.stringify(original)));
    }
  };

  // Real-time calculation previews
  const totalBaseMass = activeRecipe.ingredients.reduce((sum, ing) => sum + ing.quantity, 0);
  // Replicator engine portions (assuming 50g per puppy treats batch portion)
  const estimatedPortions = Math.max(1, Math.round(totalBaseMass / 50));

  return (
    <div id="recipe-editor-portal" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title configuration bar */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-on-surface tracking-tight">
              Gestión de Recetas
            </h1>
            <p className="text-sm text-on-surface-variant">
              Configura los pesos baseline y proporciones para el cálculo automático de requerimientos en los eventos.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onGoBack}
              className="px-4 py-2 border border-outline hover:bg-surface-container text-on-surface font-semibold text-xs rounded-full cursor-pointer"
            >
              Volver a la Bandeja
            </button>
            <button 
              onClick={() => {
                const newRecipeId = `REC-${Math.floor(2000 + Math.random() * 100)}`;
                const newRecipe: Recipe = {
                  id: newRecipeId,
                  name: 'Galletas de Hígado Especiales',
                  type: 'Altas Proteínas',
                  status: 'Active',
                  description: 'Snacks secos de alto valor de motivación para entrenamiento de cachorros o caninos de todo tamaño.',
                  ingredients: [
                    { id: '1', name: 'Hígado de Pollo Fresco o Ternera', quantity: 300, unit: 'g' },
                    { id: '2', name: 'Harina de Trigo Integral', quantity: 150, unit: 'g' }
                  ]
                };
                onSaveRecipe(newRecipe);
                setSelectedRecipeId(newRecipeId);
              }}
              className="bg-primary hover:bg-on-primary-container text-white font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-1 shadow cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Nueva Receta
            </button>
          </div>
        </header>

        {statusMessage && (
          <div className="mb-6 p-4 bg-tertiary-fixed text-on-tertiary-container rounded-xl border border-tertiary/10 text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
            <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column Pane: Base Recipes List */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 h-auto lg:h-[calc(100vh-16rem)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-extrabold text-on-surface text-base">Recetas Base</h3>
              <span className="bg-surface-container-high text-on-surface-variant text-[11px] font-bold px-2.5 py-1 rounded-full">{filteredRecipes.length} Tipos</span>
            </div>

            {/* Filter Input field */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-on-surface-variant/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Filtrar recetas..." 
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/50 rounded-xl pl-9 pr-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant/40"
              />
            </div>

            {/* List entries */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-none">
              {filteredRecipes.map((r) => {
                const isActiveSelection = r.id === selectedRecipeId;
                return (
                  <div 
                    key={r.id}
                    onClick={() => setSelectedRecipeId(r.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isActiveSelection 
                        ? 'bg-primary-container/10 border-primary ' 
                        : 'border-transparent hover:bg-surface-container hover:border-outline-variant/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isActiveSelection ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {r.name.toLowerCase().includes('salmon') ? <Fish className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isActiveSelection ? 'text-primary' : 'text-on-surface'}`}>{r.name}</h4>
                        <p className="text-[10px] font-medium text-on-surface-variant mt-0.5">{r.ingredients.length} Ingredientes • {r.type}</p>
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActiveSelection ? 'text-primary' : 'text-on-surface-variant/40'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Pane: Active Recipe configuration Canvas */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30">
              
              {/* Recipe Canvas Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-outline-variant/20 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1 text-xs">
                    <span className="bg-tertiary-container text-on-tertiary-container px-2.5 py-0.5 rounded-full font-semibold">Base de Cálculo de Motor</span>
                    <span className="text-on-surface-variant font-medium">ID: {activeRecipe.id}</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
                    {activeRecipe.name}
                    <button className="text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer" aria-label="Editar nombre de receta">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed max-w-2xl">
                    {activeRecipe.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={handleDiscard}
                    className="p-2 border border-outline-variant text-on-surface hover:bg-surface-container rounded-xl flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Descartar Ediciones
                  </button>
                  <button 
                    onClick={handleSave}
                    className="p-2 bg-primary hover:bg-on-primary-container text-white px-4 rounded-xl font-bold text-xs shadow transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Guardar Parámetros
                  </button>
                </div>
              </div>

              {/* Recipe Ingredients Parameter Matrix list */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-on-surface text-base">Matriz de Parametrización</h3>
                    <p className="text-[11px] text-on-surface-variant">Modifica los gramos y unidades base para las proporciones calculadas por evento.</p>
                  </div>

                  <button 
                    onClick={handleAddIngredient}
                    className="text-primary hover:text-on-primary-container font-semibold text-xs flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-lg cursor-pointer transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Agregar Ingrediente
                  </button>
                </div>

                {/* Matrix Rows Layout (Bento inspired grid cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {activeRecipe.ingredients.map((ing) => (
                    <div 
                      key={ing.id}
                      className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 hover:border-primary/20 transition-all shadow-inner relative group"
                    >
                      {/* Delete icon Row */}
                      <button 
                        onClick={() => handleDeleteIngredient(ing.id)}
                        className="absolute top-2.5 right-2.5 text-on-surface-variant/40 hover:text-error hover:scale-110 transition-all opacity-100 xl:opacity-0 xl:group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">Nombre del Ingrediente</label>
                          <input 
                            type="text" 
                            value={ing.name}
                            onChange={(e) => handleIngredientChange(ing.id, 'name', e.target.value)}
                            className="w-full bg-surface-container-lowest border border-outline-variant/70 rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">Cantidad Base</label>
                            <input 
                              type="number" 
                              value={ing.quantity}
                              onChange={(e) => handleIngredientChange(ing.id, 'quantity', e.target.value)}
                              className="w-full bg-surface-container-lowest border border-outline-variant/70 rounded-lg px-2.5 py-1.5 text-xs text-on-surface text-right focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">Unidad</label>
                            <select 
                              value={ing.unit}
                              onChange={(e) => handleIngredientChange(ing.id, 'unit', e.target.value)}
                              className="w-full bg-surface-container-lowest border border-outline-variant/70 rounded-lg px-2 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                            >
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="ml">ml</option>
                            </select>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Real-time calculated properties block matching Layout 4 */}
                <div className="mt-8 bg-gradient-to-br from-surface-container-high/40 to-surface-container/20 rounded-2xl p-5 border border-outline-variant/30 shadow-sm relative overflow-hidden">
                  <div className="absolute right-[-40px] top-[-40px] w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h4 className="font-display font-bold text-base text-on-surface mb-4 flex items-center gap-1.5 border-b border-outline-variant/20 pb-2">
                    <Cpu className="w-5 h-5 text-secondary" /> Vista Previa de Simulación de Motor de Cálculo
                  </h4>

                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-on-surface-variant uppercase tracking-wide text-[10px] mb-1">Masa de Porción Total</p>
                      <p className="text-2xl font-bold text-on-surface font-display flex items-baseline">
                        {totalBaseMass}<span className="text-sm font-medium text-on-surface-variant ml-0.5">g</span>
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface-variant uppercase tracking-wide text-[10px] mb-1">Estimación Porciones (Rend. 50g)</p>
                      <p className="text-2xl font-bold text-on-surface font-display flex items-baseline">
                        {estimatedPortions}<span className="text-sm font-medium text-on-surface-variant ml-0.5">unidades</span>
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface-variant uppercase tracking-wide text-[10px] mb-1">Estado de Simulación</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow animate-pulse" />
                        <span className="font-semibold text-on-surface">Validado y Autoguardado</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
