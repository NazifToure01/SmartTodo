'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@/types';
import { useCategories } from '@/contexts/AppContext';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Check, DivideIcon as LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().optional(),
});

type CreateCategoryForm = z.infer<typeof createCategorySchema>;

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCategoryDialog({ open, onOpenChange }: CreateCategoryDialogProps) {
  const { createCategory } = useCategories();
  
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      color: CATEGORY_COLORS[0].value,
      icon: CATEGORY_ICONS[0],
    },
  });
  
  const onSubmit = (data: CreateCategoryForm) => {
    const newCategory: Partial<Category> = {
      ...data,
    };
    
    createCategory(newCategory);
    form.reset();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-2">
                      {CATEGORY_COLORS.map((color) => (
                        <div
                          key={color.value}
                          className={cn(
                            "h-10 rounded-md border border-border cursor-pointer flex items-center justify-center",
                            color.value,
                            field.value === color.value && "ring-2 ring-primary"
                          )}
                          onClick={() => form.setValue('color', color.value)}
                        >
                          {field.value === color.value && (
                            <Check className="h-5 w-5 text-white" />
                          )}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (Optional)</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-6 gap-2 max-h-[200px] overflow-y-auto">
                      {CATEGORY_ICONS.map((iconName) => {
                        const IconComponent = (LucideIcons as Record<string, LucideIcon>)[iconName];
                        return (
                          <div
                            key={iconName}
                            className={cn(
                              "h-10 rounded-md border border-border cursor-pointer flex items-center justify-center",
                              field.value === iconName && "bg-primary/10 border-primary"
                            )}
                            onClick={() => form.setValue('icon', iconName)}
                          >
                            {IconComponent && <IconComponent className="h-5 w-5" />}
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}